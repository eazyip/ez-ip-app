<template>
    <header>
        <div>
            <nav>
                <!-- <NavItem to="home">Home</NavItem> -->
                <!-- <NavItem to="app">App</NavItem> -->
                <div class="pl-4">
                    <NavItem to="ipv4-address-classful-analyses">Ipv4 classful analyses</NavItem>
                    <NavItem to="ipv4-address-analyses">Ipv4 analyses</NavItem>
                    <NavItem to="ipv4-subnet-calculator">Ipv4 subnet calculator</NavItem>
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
