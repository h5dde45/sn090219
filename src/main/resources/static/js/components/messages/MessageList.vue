<template>
    <div style="position: relative; width: 300px">
        <message-form :messages="messages" :messageAtr="message"></message-form>
        <message-row v-for="message in messages"
                     :key="message.id"
                     :messages="messages"
                     :message="message"
                     :editMessage="editMessage"
                     :deleteMessage="deleteMessage"
        ></message-row>
    </div>
</template>
<script>
    import MessageRow from 'components/messages/MessageRow.vue'
    import MessageForm from 'components/messages/MessageForm.vue'

    export default {
        props: ['messages'],
        data() {
            return {
                message: null
            }
        },
        methods: {
            editMessage(message) {
                this.message = message
            },
            deleteMessage(message) {
                this.$resource('/message{/id}').remove({id: message.id})
                    .then(result => {
                        if(result.ok){
                            this.messages.splice(this.messages.indexOf(message),1)
                        }
                    })
            },
        },
        components: {
            MessageRow,
            MessageForm
        }
    }
</script>