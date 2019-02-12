<template>
    <div>
        <input type="text" placeholder="Write something" v-model="text"/>
        <input type="button" value="Save" @click="save"/>
    </div>
</template>
<script>
    function getIndex(list, id) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return i
            }
        }
        return -1
    }

    export default {
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
        methods: {
            save() {
                let message = {text: this.text}
                if (this.id) {
                    this.$resource('/message{/id}').update({id: this.id}, message)
                        .then(result => {
                            result.json().then(data => {
                                let index = getIndex(this.messages, data.id);
                                this.messages.splice(index, 1, data)
                                this.id = ''
                                this.text = ''
                            })
                        })
                } else {
                    this.$resource('/message{/id}').save({}, message)
                        .then(result =>
                            result.json().then(data => {
                                this.messages.push(data)
                                this.text = ''
                            })
                        )
                }
            }
        }
    }
</script>