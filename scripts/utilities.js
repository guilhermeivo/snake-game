const utilities = {
    possibleButtons: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],

    eventsClick() {
        // add events to identify keys
        window.addEventListener('keydown', event => {
            setup.keys = []
            setup.keys[event.code] = true

            utilities.restartGame()

            event.target.removeEventListener('click', this)
        })

        setup.interface.navigationButtons.forEach((button, index) => {
            button.addEventListener('click', event => {
                event.preventDefault()

                setup.keys = []
                setup.keys[this.possibleButtons[index]] = true
        
                utilities.restartGame()
            })
        })

        setup.interface.extraButtons.forEach(button => {
            button.addEventListener('click', this.extraHandler)
        })        

        setup.interface.configButtons.forEach(button => {
            button.addEventListener('click', this.configHandler)
        })        
    },

    extraHandler(event) {
        event.preventDefault()
            
        utilities.restartGame()
    },

    configHandler(event) {
        event.preventDefault()

        setup.sound = !setup.sound
        utilities.themeSound()

        event.target.setAttribute('title', setup.sound ? 'Button Sound: on' : 'Button Sound: off')
    },

    removeEventsClick() {
        setup.interface.extraButtons.forEach(button => {
            button.removeEventListener('click', this.extraHandler)
        })        

        setup.interface.configButtons.forEach(button => {
            button.removeEventListener('click', this.configHandler)
        })  
    },

    restartGame() {
        if (setup.inGame == false) {    
            setup.inGame = true
            this.removeEventsClick()
            setup.start()
        }
    },

    themeSound() {
        if (!setup.soundTheme && setup.sound) {
            setup.audio.theme.loop = true
            setup.audio.theme.volume = 0.4
            setup.audio.theme.play()

            setup.soundTheme = true
        }

        if (setup.soundTheme && !setup.sound) {
            setup.audio.theme.pause()

            setup.soundTheme = false
        }
    }
}