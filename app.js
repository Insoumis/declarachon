// Fausses données en attendant les vrais chiffres du 19/02
var tranchesInsoumises = [];
tranchesInsoumises.push([5000, 0.007]);
tranchesInsoumises.push([9000, 0.01]);
tranchesInsoumises.push([15000, 0.07]);
tranchesInsoumises.push([20000, 0.1]);
tranchesInsoumises.push([30000, 0.15]);
tranchesInsoumises.push([45000, 0.25]);
tranchesInsoumises.push([65000, 0.35]);
tranchesInsoumises.push([90000, 0.45]);
tranchesInsoumises.push([120000, 0.5]);
tranchesInsoumises.push([151260, 0.55]);
tranchesInsoumises.push([200000, 0.65]);
tranchesInsoumises.push([250000, 0.75]);
tranchesInsoumises.push([300000, 0.85]);
tranchesInsoumises.push([400000, 1]);

// données 2017
var tranchesActuelles = [];
tranchesActuelles.push([9710, 0]);
tranchesActuelles.push([26819, 0.14]);
tranchesActuelles.push([71898, 0.3]);
tranchesActuelles.push([151260, 0.41]);

// Init vue.js
new Vue({
    el: '#app',
    data: {
        revenu: null,
        parts: null
    },
    computed: {
        actuels: function () {
            return impots(tranchesActuelles, this.revenu, this.parts);
        },
        insoumis: function () {
            return impots(tranchesInsoumises, this.revenu, this.parts);
        }
    }
});

// inspiré de https://gist.github.com/bactisme/35ef23f3f73a9dd97d00
function impots(tranches, montant, parts) {
    var impot = 0;

    if (!parts) {
        parts = 1;
    }

    montant = parseInt(montant) / parseInt(parts);

    for (var i = 0; i < tranches.length; i++) {
        var tranche = tranches[i][0];
        var taux = tranches[i][1];

        if (montant >= tranche) {
            impot += tranche * taux;
            montant = montant - tranche;
        } else if (montant < tranche) {
            impot += montant * taux;
            montant = 0;
            break;
        }
    }

    if (montant > 0)
        impot += montant * 0.45;

    return Math.round(impot);
}