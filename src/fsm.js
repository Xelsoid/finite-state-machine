class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
            this.config=config;
            this.currentState=config.initial;
            this.prevState=false;
            this.reState=false;
        }else{
            throw new Error('Need config');
        }

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    //             console.log(this.currentState);
    // this.config.initial=this.currentState;

    //     console.log(this.config.initial);
    // for(var N in this.config.states){
    //     if(state==N){
    //         this.prevState=this.config.initial;
    //         this.currentState=state;
    //         return this;
    //     }        
    // }
    if(this.config.states[state]){
        this.prevState=this.currentState;
        this.currentState=state;      
        return this;
    }
    throw new Error('Have not this state');
}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        // for(var Z in this.config.states){
        //     if(this.config.states[Z].transitions[event]){
        //         this.currentState=this.config.states[Z].transitions[event];
        //         this.prevState=Z;
        //         return this.currentState;
        //     }
        // }
        var trigState=this.config.states[this.currentState].transitions[event];

        if(!trigState){
            throw new Error('This state is not exist');
        }

        this.changeState(trigState);
        return trigState;
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState=this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arrayWithEvents=[];

        if(event){
            for(var Z in this.config.states){
                if(this.config.states[Z].transitions[event]){
                    arrayWithEvents.push(Z);
                    console.log(arrayWithEvents);
                }
            }
            return arrayWithEvents;
        }

        for(var Z in this.config.states){
            arrayWithEvents.push(Z);
        }
        console.log(arrayWithEvents);
        return arrayWithEvents;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.prevState){
            this.reState=this.currentState;
            this.currentState=this.prevState;
            this.prevState=false;
            return true;
        }
        return this.prevState;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.reState){
            this.prevState=this.currentState;
            this.currentState=this.reState;
            this.reState=false;
            return true;
        }
        return this.reState;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevState=false;
        this.reState=false;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/