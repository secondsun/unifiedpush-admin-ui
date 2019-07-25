import { init } from '@aerogear/app';
import { PushRegistration } from "@aerogear/push";
import * as config from "./mobile-services"

const app = {
    initialize: function () {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent("deviceready");

        var aerogear = init(config);

        new PushRegistration(aerogear.config).register().then(() => {
            console.log('Device registered');
        }).catch(err => {
            console.error('Device registration error:', err);
        });
    },

    receivedEvent: function (id) {
        const parentElement = document.getElementById(id);
        const listeningElement = parentElement.querySelector(".listening");
        const receivedElement = parentElement.querySelector(".received");

        listeningElement.setAttribute("style", "display:none;");
        receivedElement.setAttribute("style", "display:block;");

        console.log("Received Event: " + id);
    }
};

app.initialize();
