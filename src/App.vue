<template>
    <header>
        <div>
            <nav>
                <NavItem route="/">Home</NavItem>
                <NavItem route="/app">App</NavItem>
                <div class="pl-4">
                    <NavItem route="/app/ipv4/address-classful-analyses"
                        >address-classful-analyses</NavItem
                    >
                    <NavItem route="/app/ipv4/address-analyses">address-analyses</NavItem>
                    <NavItem route="/app/ipv4/subnet-calculator">subnet-calculator</NavItem>
                </div>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import NavItem from '@/components/NavItem.vue'
</script>
