import { Joueur } from "/js/joueur.js"
import { Cartes } from "/js/cartes.js"
import { Coeur, Pique, Carreau, Trèfle } from "/js/cartes.js"

///
/// Auteur : Xavier Côté-Daviau, Michael Meilleur et Mahdi Ellili
/// Description : Gestion des méthodes pour le jeu de bataille.
/// Date : 2022-09-26
///

// Variables globales
var _Compteur = 0;
var _Cartes_Tournées = new Array();
var _Cartes_Joueur_Temp = new Array();
var _Cartes_Ordi_Temp = new Array();

export class Bataille {
    //Champs privées
    #_Joueur = new Joueur();
    #_Ordi = new Joueur();
    #_Cartes = new Array();
    #_Bataille = false;

    //Propriétés 
    get Joueur() {
        return this.#_Joueur;
    }
    get Ordi() {
        return this.#_Ordi;
    }
    get Cartes() {
        return this.#_Cartes;
    }
    constructor() {
        this.#_Cartes = this.Initier_cartes();
    }
    //Méthodes

    /// Auteur : Xavier Côté-Daviau
    /// Description : Permet de créer un paquet de 52 cartes mélangées.
    /// Date : 2022-10-02
    Initier_cartes() {
        // Variables locales
        let paquet = new Array();
        let random = 0;
        let random2 = 0;
        let x = 0;

        for (var i = 0; i < 4; i++) {
            for (var j = 2; j < 15; j++) {
                if (i == 0)
                    paquet.push(new Coeur(j));  // Ajoute un objet de type Coeur au stack
                if (i == 1)
                    paquet.push(new Pique(j));  // Ajoute un objet de type Pique au stack
                if (i == 2)
                    paquet.push(new Carreau(j)); // Ajoute un objet de type Carreau au stack
                if (i == 3)
                    paquet.push(new Trèfle(j));  // Ajoute un objet de type Trèfle au stack
            }
        }

        do {
            random = Math.floor(Math.random() * 52);    // Chiffre aléatoire entre 0 et 51
            let echange = paquet[random];
            random2 = Math.floor(Math.random() * 52);    // Chiffre aléatoire entre 0 et 51
            let echange2 = paquet[random2];

            paquet[random] = echange2;
            paquet[random2] = echange;

            x++;
        } while (x < 1000);

        return paquet;
    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de distribuer les cartes aux joueurs.
    /// Date : 2022-09-26
    Distribuer_cartes() {
        for (var i = 0; i < 26; i++) {
            this.#_Joueur.Source[i] = this.#_Cartes[i]; // Transférer les 26 premiers cartes au tableau source du joueur
        }
        for (var i = 26; i < 52; i++) {
            this.#_Ordi.Source[i - 26] = this.#_Cartes[i]; // Transférer les 26 dernières cartes au tableau source de l'ordinateur
        }
    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de rebrasser les paquets de cartes.
    /// Date : 2022-09-26
    Rebrasser_cartes(player, robot) {
        $('.bataille').html('');

        // Brasser les cartes // Problème d'affichage à la suite de l'exécution de cette méthode. 
        for (var i = 0; i < _Cartes_Joueur_Temp.length; i++) {
            this.#_Joueur.Source[this.#_Joueur.Source.length] = _Cartes_Joueur_Temp[i];
        }
        for (var i = 0; i < _Cartes_Ordi_Temp.length; i++) {
            this.#_Ordi.Source[this.#_Ordi.Source.length] = _Cartes_Ordi_Temp[i];
        }

        // Mettre les bonnes images
        $('#PileOrdi').attr('class', 'cartes Carte-Dessu');
        $('#PileJoueur').attr('class', 'cartes Carte-Dessu');
        $('#CarteJoueur').attr('class', 'cartes Pile');
        $('#CarteOrdi').attr('class', 'cartes Pile');

        // Effacer les boutons rebrasser.
        $('#RebrasserJoueur').html('');
        $('#RebrasserJoueur').css('color', '');
        $('#RebrasserJoueur').css('border', '');
        $('#RebrasserJoueur').css('background-color', 'transparent');

        $('#RebrasserOrdi').html('');
        $('#RebrasserOrdi').css('color', '');
        $('#RebrasserOrdi').css('border', '');
        $('#RebrasserOrdi').css('background-color', 'transparent');

        // Mise à jour des statistiques.
        player.NbCartesTournées = 0;
        robot.NbCartesTournées = 0;

        // Afficher le nb de cartes dans la piles.
        $('#valeur_cartes_joueur').html(this.#_Joueur.Source.length);
        $('#valeur_cartes_ordinateur').html(this.#_Ordi.Source.length);

        // Afficher le nb de cartes tournées.
        $('#valeur_cartes_tournées_joueur').html(player.NbCartesTournées);
        $('#valeur_cartes_tournées_ordinateur').html(robot.NbCartesTournées);

        // Afficher le nb total de cartes.
        $('#valeur_total_joueur').html(player.NbCartesTournées + this.#_Joueur.Source.length);
        $('#valeur_total_ordinateur').html(robot.NbCartesTournées + this.#_Ordi.Source.length);
    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de donner les cartes tournées au gagnant de la bataille.
    /// Date : 2022-09-26
    Récupérer_cartes(gagnant, Cartes_tournées) {

        for (var i = 0; i < Cartes_tournées.length; i++) {
            gagnant[gagnant.length] = Cartes_tournées[i];
        }
    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de tourner et afficher les cartes.
    /// Date : 2022-09-26
    Tourner_cartes(player, robot) {
        $('.bataille').html('');
        let Carte_Joueur = new Cartes();
        let Carte_Ordi = new Cartes();
        Carte_Joueur = this.#_Joueur.Source.splice(0, 1);
        Carte_Ordi = this.#_Ordi.Source.splice(0, 1);

        $('#CarteJoueur').attr('class', 'cartes ' + Carte_Joueur[0].Suite + '-' + Carte_Joueur[0].Numéro);  // Attribution de la classe en fonction de la carte tiré.
        $('#CarteOrdi').attr('class', 'cartes ' + Carte_Ordi[0].Suite + '-' + Carte_Ordi[0].Numéro);      // Attribution de la classe en fonction de la carte tiré.

        // Afficher le nb de cartes dans la piles.
        $('#valeur_cartes_joueur').html(this.#_Joueur.Source.length);
        $('#valeur_cartes_ordinateur').html(this.#_Ordi.Source.length);

        // Afficher le nb de cartes tournées.
        player.NbCartesTournées++;
        robot.NbCartesTournées++;
        $('#valeur_cartes_tournées_joueur').html(player.NbCartesTournées);
        $('#valeur_cartes_tournées_ordinateur').html(robot.NbCartesTournées);

        // Afficher le nb total de cartes.
        $('#valeur_total_joueur').html(player.NbCartesTournées + this.#_Joueur.Source.length);
        $('#valeur_total_ordinateur').html(robot.NbCartesTournées + this.#_Ordi.Source.length);

        // Remplir des tableaux avec les cartes tournées.
        _Cartes_Tournées[_Compteur] = Carte_Joueur;
        _Cartes_Tournées[_Compteur + 1] = Carte_Ordi;

        _Cartes_Joueur_Temp[_Cartes_Joueur_Temp.length] = Carte_Joueur;
        _Cartes_Ordi_Temp[_Cartes_Ordi_Temp.length] = Carte_Ordi;

        _Compteur++;

        if (this.#_Bataille) {
            this.Déterminer_gagnant_bataille(Carte_Joueur, Carte_Ordi, _Cartes_Tournées, player, robot);
            this.#_Bataille = false;
            $('.bataille').html('');
        }

        // Vérifier si bataille
        if (Carte_Joueur[0].Numéro == Carte_Ordi[0].Numéro) {
            $('.bataille').html('Bataille!!!');
            this.#_Bataille = true;
            _Compteur = 0;
        }

        // Vérifier si un paquet est vide
        if (this.#_Ordi.Source.length == 0) {
            $('#RebrasserOrdi').html('Pile vide!!! Rebrasser');
            $('#RebrasserOrdi').css('color', 'white');
            $('#RebrasserOrdi').css('height', '50px');
            $('#RebrasserOrdi').css('width', '250px');
            $('#RebrasserOrdi').css('font-size', '20px');
            $('#RebrasserOrdi').css('border', '1px solid black');
            $('#RebrasserOrdi').css('background-color', 'red');
            $('#RebrasserOrdi').css('border-radius', '5px');
            $('#RebrasserOrdi').css('margin-top', '15px');

            $('#PileOrdi').attr('class', 'cartes Pile');
        }
        if (this.#_Joueur.Source.length == 0) {
            $('#RebrasserJoueur').html('Pile vide!!! Rebrasser');
            $('#RebrasserJoueur').css('color', 'white');
            $('#RebrasserJoueur').css('height', '50px');
            $('#RebrasserJoueur').css('width', '250px');
            $('#RebrasserJoueur').css('font-size', '20px');
            $('#RebrasserJoueur').css('border', '1px solid black');
            $('#RebrasserJoueur').css('background-color', 'red');
            $('#RebrasserJoueur').css('border-radius', '5px');
            $('#RebrasserJoueur').css('margin-top', '15px');

            $('#PileJoueur').attr('class', 'cartes Pile');
        }

    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de determiner le gagnant de la bataille.
    /// Date : 2022-09-26
    Déterminer_gagnant_bataille(Carte_Joueur, Carte_Ordi, _Cartes_Tournées, player, robot) {
        if (Carte_Joueur[0].Numéro > Carte_Ordi[0].Numéro) {
            this.Récupérer_cartes(this.#_Joueur.Source, _Cartes_Tournées);
            robot.NbCartesTournées = 0;
            while (_Cartes_Ordi_Temp.length != 0) {
                _Cartes_Ordi_Temp.pop();
            }
        }
        else if (Carte_Ordi[0].Numéro > Carte_Joueur[0].Numéro) {
            this.Récupérer_cartes(this.#_Ordi.Source, _Cartes_Tournées);
            player.NbCartesTournées = 0;
            while (_Cartes_Joueur_Temp.length != 0) {
                _Cartes_Joueur_Temp.pop();
            }
        }
    }

    /// Auteurs : Xavier Côté-Daviau, Michael Meilleur, Mahdi Ellili
    /// Description : Permet de determiner le gagnant de la partie.
    /// Date : 2022-09-26
    Déterminer_partie_gagnée() {
        if (this.#_Joueur.Source.length == 0 && _Cartes_Joueur_Temp.length == 0) {
            $('.bataille').html('Partie gagnée!');
        }
        if (this.#_Ordi.Source.length == 0 && _Cartes_Ordi_Temp.length == 0) {
            $('.bataille').html('Partie gagnée!');
        }
    }
}