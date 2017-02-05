class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(config){
            this.config=config;
            this.initialState=this.config.initial;
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
        return this.config.initial;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        console.log(this.config.initial);
    for(var N in this.config.states){
        if(state==N){
            this.prevState=this.config.initial;
            this.config.initial=state;
            return this;
        }        
    }
    throw new Error('Have not this state');
}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(var Z in this.config.states){
            if(this.config.states[Z].transitions[event]){
                this.config.initial=this.config.states[Z].transitions[event];
                this.prevState=Z;
                return this.config.initial;
            }
        }
        throw new Error('This state is not exist');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config.initial=this.initialState;
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
            this.reState=this.config.initial;
            this.config.initial=this.prevState;
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
            this.prevState=this.config.initial;
            this.config.initial=this.reState;
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

const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};
