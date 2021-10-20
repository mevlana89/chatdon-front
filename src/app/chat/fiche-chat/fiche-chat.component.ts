import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Chat } from '../Chat';
import { ChatService } from '../chat.service';
import { DONATEUR, CANDIDAT,  STATUS_ENCOURS } from 'src/app/shared/listes';
import { Donateur } from 'src/app/utilisateur/donateur';
import { Candidat } from 'src/app/utilisateur/candidat';
import { CandidatureService } from 'src/app/candidature/candidature.service';
import { Candidature } from 'src/app/candidature/candidature.model';
import { CreateCandidature } from 'src/app/candidature/candidature';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';


@Component({
  selector: 'app-fiche-chat',
  templateUrl: './fiche-chat.component.html',
  styleUrls: ['./fiche-chat.component.css']
})
export class FicheChatComponent implements OnInit {


  constructor(private serviceCandidature:CandidatureService,private serviceChat: ChatService, private utilisateurService: UtilisateurService, private route: ActivatedRoute, private router: Router) { }

  leChat: Chat = new Chat();
  chatId: number = 0;

  isDonateurDuChat: boolean = false;
  isCandidatDuChat: boolean = false;
  isCandidat: boolean = false;
  isOldCandidatDuChat:boolean=false;

  donateur: Donateur = new Donateur;
  candidat: Candidat = new Candidat;
  idCandidature : number=0;

  ngOnInit(): void {

    this.route.paramMap.subscribe(( params: ParamMap) => {
      if (params.get('id') == null) {
        return;
      }
      this.chatId = parseInt(params.get('id')!);

      this.serviceChat.getChatById(this.chatId).subscribe(data => {

        this.leChat = data;
        let role: string | null = localStorage.getItem('role');
        if (role == DONATEUR) {
          console.log("profil donateur");
          let stringDonateur: string | null = localStorage.getItem(DONATEUR);
          if (stringDonateur != null) {
            this.donateur = JSON.parse(stringDonateur);
            if (this.donateur.id == this.leChat.donateur?.id) {
              console.log("id identique, donateur du chat");
              this.isDonateurDuChat = true;
            }
          }
        }
        if (role == CANDIDAT) {
          let stringCandidat: string | null = localStorage.getItem(CANDIDAT);
          if (stringCandidat != null) {
            this.candidat = JSON.parse(stringCandidat);
            this.serviceCandidature.getAllCandidaturesDtoByCatId(this.leChat.id).subscribe(
              data=>{
                let candidatures:CreateCandidature[]=data;
                 for (var candidature of candidatures){
                   if (candidature.candidat.id==this.candidat.id){
                     console.log("candidature candidat id = candidat id")
                     if(candidature.status==STATUS_ENCOURS){
                      console.log("statut en cours, idCandidature mis à " + candidature.id)
                       this.isCandidatDuChat=true;
                       this.idCandidature=candidature.id;
                     }
                     else{
                      console.log("statut old, idCandidature not set");
                       this.isOldCandidatDuChat=true;
                     }
                   }
                 }
                 if(this.isCandidatDuChat==false && this.isOldCandidatDuChat==false){
                   this.isCandidat=true;
                 }
              }
            )
          }

        }
      }, error => {
        console.log("Erreur recup chat ! ");
        this.router.navigate(['/']);
      });
    });
  }

  editChat() {
    this.router.navigate(['/updatechat/', this.leChat.id]);
  }
  postuler(){
    let candidature= new CreateCandidature();
    candidature.chat=this.leChat;
    candidature.status=STATUS_ENCOURS;
    candidature.candidat=this.candidat;
    this.serviceCandidature.createCandidature(candidature).subscribe(
      data => {
        console.log(data);
        alert('Votre candidature a été enregistrée avec succès.');
        this.isCandidat=false;
        this.isCandidatDuChat=true;
      }
    );
  }

  annulerCandidature(){
    console.log("annuler candidature" + this.idCandidature);
    if (this.idCandidature >0){
      this.serviceCandidature.deleteCandidatureById(this.idCandidature).subscribe(
        data=>{
          console.log(data);
          alert('Votre candidature a été supprimée avec succès.');
          this.isCandidat=true;
          this.isCandidatDuChat=false;
        }
      )
    }

  }

  voirDonateur(){
    console.log('voirDonateur - le candidat', this.candidat);
    console.log('voirDonateur - le donateur: ', this.donateur);
    console.log('voirDonateur - le chat: ', this.leChat);
    console.log('voirDonateur - le donateurid: ', this.leChat.donateur?.id);
    if ( this.leChat.donateur?.id != null && this.leChat.donateur?.id > 0){
      this.utilisateurService.getDonateurById(this.leChat.donateur?.id).subscribe(
        (data) =>{
          console.log('retour voirDonateur' + this.leChat.donateur?.id + " data : " + data);

          this.router.navigate(['/editDonateur', this.leChat.donateur?.id]);
        }
      )

    }
  }


  createChat() {
    console.log("debut create");
    if (this.leChat.nom.length == 0){
      console.log("chat sans nom... sortie");
      return;
    }
    console.log(this.leChat.nom + ", " + this.leChat.caractere + ", " + this.leChat.race);
    this.serviceChat.createChat(this.leChat).subscribe(
    rsp => {
      console.log("retour service => id : " + rsp.id + " nom : " + rsp.nom + ", " + rsp.caractere + ", " + rsp.race);
      this.router.navigate(['/fichechat/', rsp.id]);
    },
    error => {
      console.log(" createChat error!");
      console.log(error);
    });
  }

}
