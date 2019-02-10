function getIndex(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i
        }
    }
    return -1
}

let messageApi = Vue.resource('/message{/id}')

Vue.component('message-form', {
    props: ['messages', 'messageAtr'],
    data() {
        return {
            id: '',
            text: ''
        }
    },
    watch: {
        messageAtr(newVal, oldVal) {
            this.text = newVal.text
            this.id = newVal.id
        }
    },
    template: `<div>
    <input type="text" placeholder="Write something" v-model="text"/>
    <input type="button" value="Save" @click="save"/>
    
    </div>`,
    methods: {
        save() {
            let message = {text: this.text}
            if (this.id) {
                messageApi.update({id: this.id}, message)
                    .then(result => {
                        result.json().then(data => {
                            let index = getIndex(this.messages, data.id);
                            this.messages.splice(index, 1, data)
                            this.id = ''
                            this.text = ''
                        })
                    })
            } else {
                messageApi.save({}, message)
                    .then(result =>
                        result.json().then(data => {
                            this.messages.push(data)
                            this.text = ''
                        })
                    )
            }
        }
    }
})

Vue.component('message-row', {
    props: ['message', 'messages', 'editMethod'],
    template: `<div >
    <i>{{message.id}}. </i>{{message.text}} 
    <span style="position: absolute; right: 0">
    <input type="button" value="Edit" @click="edit"/>
    <input type="button" value="Delete" @click="del"/>
    </span>
    </div>`,
    methods: {
        edit() {
            this.editMethod(this.message)
        },
        del() {
            messageApi.delete({id: this.message.id})
                .then(result => {
                    if (result.ok) {
                        this.messages.splice(this.messages.indexOf(this.message), 1)
                    }

                })
        }
    }
})

Vue.component('messages-list', {
    props: ['messages'],
    data() {
        return {
            message: null
        }
    },
    template: `<div style="position: relative; width: 300px">
    <message-form :messages="messages" :messageAtr="message"></message-form>
    <message-row v-for="message in messages" :key="message.id"  :messages="messages"
    :message="message" :editMethod="editMethod"></message-row>
    </div>`,
    methods: {
        editMethod(message) {
            this.message = message
        }
    }
})

new Vue({
    el: '#app',
    template: '<messages-list :messages="messages"></messages-list>',
    data: {
        messages: []
    },
    created() {
        messageApi.get()
            .then(result =>
                result.json()
                    .then(data =>
                        data.forEach(message => this.messages.push(message)))
            )
    }
})