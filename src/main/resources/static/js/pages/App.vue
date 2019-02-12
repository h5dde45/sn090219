<template>
    <div class="mainApp">
        <div v-if="!profile">
            Авторизация: <a href="/login">Google</a>
        </div>
        <div v-else>
            <div>{{profile.name}}&nbsp;<a href="/logout">Выйти</a></div>
            <messages-list :messages="messages"></messages-list>
        </div>
    </div>
</template>
<script>
    import MessagesList from 'components/messages/MessageList.vue'

    export default {
        data() {
            return {
                messages: frontendData.messages,
                profile: frontendData.profile
            }
        },
        components: {
            MessagesList
        }
    }
</script>
<style>
</style>