<script setup lang="ts">
import { onMounted } from 'vue';
import { useSystemStore } from '../stores/system';
import RadialProgress from '../components/UI/RadialProgress.vue';
import { kbToMb } from '../utils/unitFormatter.ts';

const system = useSystemStore();

onMounted(() => {
  system.fetchSystemInfo();
})
</script>

<template>
    <section class="flex flex-col gap-6">
        <div class="flex items-center justify-between gap-4">
            <div>
                <h1>System</h1>
                <p class="opacity-60">{{ system.systemInfo.cpuInfo.model }}</p>
            </div>
            <div class="text-right">
                <p class="text-sm opacity-60">Local time</p>
                <p>{{ system.formattedSystemTime.toLocaleString() }}</p>
            </div>
        </div>

        <section>
            <h2 class="mb-3">Live metrics</h2>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-base-300 p-4">
                    <RadialProgress :value="system.moonrakerStats.cpu_usage" />
                    <p>CPU usage</p>
                </div>
                <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-base-300 p-4">
                    <RadialProgress :value="system.memoryUsagePercentage" />
                    <p class="text-sm opacity-50">{{ kbToMb(system.moonrakerStats.memory) }} / {{ kbToMb(system.systemInfo.cpuInfo.total_memory) }} mB</p>
                    <p>Memory usage</p>
                </div>
                <div class="flex flex-col items-center justify-center gap-1 rounded-xl border border-base-300 p-4">
                    <p class="text-2xl font-bold">{{ system.cpuTemp.toFixed(2) }} °C</p>
                    <p>CPU temperature</p>
                </div>
            </div>
        </section>
        <section>
            <div class="flex flex-col gap-2">
                <a href="#" class="btn w-full" disabled="disabled">View Connected Devices <i class="ri-arrow-right-s-line"></i></a>
                <a href="#" class="btn w-full" disabled="disabled">Check Component Updates <i class="ri-arrow-right-s-line"></i></a>
            </div>
        </section>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section>
                <h2 class="mb-3">Processor</h2>
                <dl class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div><dt class="text-sm opacity-60">Description</dt><dd>{{ system.systemInfo.cpuInfo.cpu_desc }}</dd></div>
                    <div><dt class="text-sm opacity-60">Architecture</dt><dd>{{ system.systemInfo.cpuInfo.processor }} ({{ system.systemInfo.cpuInfo.bits }})</dd></div>
                    <div><dt class="text-sm opacity-60">CPU cores</dt><dd>{{ system.systemInfo.cpuInfo.cpu_count }}</dd></div>
                    <div><dt class="text-sm opacity-60">Hardware</dt><dd>{{ system.systemInfo.cpuInfo.hardware_desc }}</dd></div>
                    <div><dt class="text-sm opacity-60">Serial number</dt><dd>{{ system.systemInfo.cpuInfo.serial_number }}</dd></div>
                </dl>
            </section>

            <section>
                <h2 class="mb-3">Operating system</h2>
                <dl class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div><dt class="text-sm opacity-60">Distribution</dt><dd>{{ system.systemInfo.distribution.name }}</dd></div>
                    <div><dt class="text-sm opacity-60">Version</dt><dd>{{ system.systemInfo.distribution.version }}</dd></div>
                    <div><dt class="text-sm opacity-60">Codename</dt><dd>{{ system.systemInfo.distribution.codename }}</dd></div>
                    <div><dt class="text-sm opacity-60">Family</dt><dd>{{ system.systemInfo.distribution.like }}</dd></div>
                </dl>
            </section>

            <section>
                <h2 class="mb-3">Storage</h2>
                <dl class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div><dt class="text-sm opacity-60">Device</dt><dd>{{ system.systemInfo.sdInfo.product_name }}</dd></div>
                    <div><dt class="text-sm opacity-60">Manufacturer</dt><dd>{{ system.systemInfo.sdInfo.manufacturer }}</dd></div>
                    <div><dt class="text-sm opacity-60">Capacity</dt><dd>{{ system.systemInfo.sdInfo.capacity }}</dd></div>
                    <div><dt class="text-sm opacity-60">Revision</dt><dd>{{ system.systemInfo.sdInfo.product_revision }}</dd></div>
                    <div><dt class="text-sm opacity-60">Manufactured</dt><dd>{{ system.systemInfo.sdInfo.manufacturer_date }}</dd></div>
                </dl>
            </section>

            <section>
                <h2 class="mb-3">Connections</h2>
                <dl class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div><dt class="text-sm opacity-60">WebSocket clients</dt><dd>{{ system.websocketConnections }}</dd></div>
                    <div v-for="(network, name) in system.systemInfo.network" :key="name"><dt class="text-sm opacity-60">{{ name }} IP addresses</dt><dd>{{ network.ip_addresses.join(', ') || 'None' }}</dd></div>
                </dl>
            </section>
        </div>

        <section>
            <h2 class="mb-3">Services</h2>
            <div class="overflow-x-auto">
                <table class="table">
                    <thead><tr><th>Service</th><th>State</th><th>Sub-state</th></tr></thead>
                    <tbody>
                        <tr v-for="(serviceState, service) in system.systemInfo.serviceStates" :key="service">
                            <td>{{ service }}</td>
                            <td>{{ serviceState.active_state || 'Unknown' }}</td>
                            <td>{{ serviceState.sub_state || 'Unknown' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </section>
</template>