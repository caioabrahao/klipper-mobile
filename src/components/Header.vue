<template>
<header class="navbar bg-base-100 shadow-sm sticky w-full top-0 z-10 gp-x">
    <div class="navbar-start">
        <div class="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center">
                <!-- Page content here -->
                <label for="my-drawer-3" tabindex="0" role="button" class="btn btn-ghost drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </label>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
                <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>

        <span class="btn btn-ghost text-xl">CR-10 V3</span>
    </div>
    <div class="navbar-center hidden lg:flex">
        
    </div>
    
    <div class="navbar-end">
        
    </div>
</header>
</template>