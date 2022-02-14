



let Input = {
    keypress(event) {
        let name = event.key;
        let code = event.code;
        console.log('Key Press:', name);

        /*
        +   = Ch+
        -   = Ch-
        *   = Vol+
        /   = Vol-
        .   = Channel List
        0-9 = Enter Channel
        F5  = refresh Page (default browser key)
        */

        ///---Check if input is number or command key----///
        if (isNaN(name)) {
            switch (name) {
                case '+':
                case 'PageUp':
                    if (Element.listDisplayDiv().style.display == "block") { InputFunction.overscan(name); } else {
                        if (get.num >= Channels.length - 1) { get.num = 0; Input.refresh(); } else { get.num++; Input.refresh(); }
                    }
                    break;
                case '-':
                case 'PageDown':
                    if (Element.listDisplayDiv().style.display == "block") { InputFunction.overscan(name); } else {
                        if (get.num <= 0) { get.num = Channels.length - 1; Input.refresh(); } else { get.num--; Input.refresh(); }
                    }
                    break;
                case '.':
                case ',':
                case 'Backspace':
                    if (Element.listDisplayDiv().style.display === "none") { 
                        localStorage.setItem('firstTime', 1);
                        Element.chNameDisplay().style.display = "block"; Element.listDisplayDiv().style.display = 'block'; 
                    }
                    else { E
                        lement.chNameDisplay().style.display = "none"; Element.channelEntry().style.display = "none"; Element.listDisplayDiv().style.display = 'none'; 
                    }
                    Element.controlDisplay().style.display = "none";
                    break;
                case '*':
                    InputFunction.volumeUp(name);
                    break;
                case '/':
                    InputFunction.volumeDown(name);
                    break;
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                    if (Element.listDisplayDiv().style.display == "block") { InputFunction.overscan(name); }
                    break;
                case "End":
                    
                    get.pageData.push(get.rndEpisodeNum);
                    ///and save the array to local storage (each channel gets its own local storage slot)
                    localStorage.setItem(get.num, JSON.stringify(get.pageData));
                    Input.refresh();
                    break;
                case "Home":
                    InputFunction.screenOff();
                    break;
                case "Insert":
                    Input.refresh();
                    break;
            }

        }
        ///----------if input is a number, enter numbers for channel--------///
        else {
            //we must clear this value if a system message is displayed (like Memory Cleared or whatever)
            if (isNaN(Element.channelEntry().textContent)) { Element.channelEntry.textContent = '' };
            Element.channelEntry().style.display = 'block';
            Element.chNameDisplay().style.display = "none";
            Element.channelEntry().textContent += name;
            name = '';
            get.n++;

            //if two numbers have been input
            if (get.n >= 2) {

                let nn = Element.channelEntry().textContent;
                //subtract one to specify array index
                nn--;

                if (nn >= Channels.length || nn < 0) {

                    //if the chList is open, some number inputs can be used as special commands
                    if (Element.listDisplayDiv().style.display == "block") {
                        //nn is decremented before hand so the input will be one less (ie, 99=98 or 00=-1)
                        switch (nn) {
                            case 98:
                                localStorage.removeItem(get.num);
                                Element.channelEntry().textContent = 'Channel Memory Cleared';
                                get.n = 0;
                                break;
                            case 97:
                                localStorage.clear();
                                Element.channelEntry().textContent = 'All Memory Cleared';
                                get.n = 0;
                                break;
                            case -1:
                                Element.controlDisplay().style.display = "block";
                                Element.channelEntry().textContent = '';
                                get.n = 0;
                                break;
                            default:
                                Element.channelEntry().style.display = 'none';
                                Element.channelEntry().textContent = '';
                                get.n = 0;
                                break;
                        }

                    }
                    else {
                        Element.channelEntry().style.display = 'none';
                        Element.channelEntry().textContent = '';
                        get.n = 0;
                    }
                }
                else {
                    setInterval(function () {
                        localStorage.setItem('lastChannel', nn);
                        location.reload();
                    }, 500)
                }

            }

        }



    },
    
    refresh() {
        localStorage.setItem('lastChannel', get.num);
        location.reload();
    }
};


