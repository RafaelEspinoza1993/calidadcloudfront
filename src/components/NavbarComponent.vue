<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img class='logo' src="../assets/logopersonal.png">
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<style scoped>
    .logo {
        max-height: 8rem;
    }
</style>