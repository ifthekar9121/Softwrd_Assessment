<script>
    import { Card, Button, Progressbar } from 'flowbite-svelte';
    import { successRate } from '$lib';
    import ModalElement from './ModalElement.svelte';
    let clickOutsideModal = $state(false);
    let size = $state('sm');
    let selectedPad = $state(null);
    let { filteredPads } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each filteredPads as row}
        <div class="card-components rounded-lg">
            <div class="py-3.5 text-base text-gray-900 font-semibold border-b px-6">
                {row.full_name}
            </div>
            <div class="py-6 px-6 font-normal text-gray-700 capitalize">
                <p class="mb-1"> Location: {row.location.name}</p>
                <p class="mb-1"> Region: {row.location.region}</p>
                <p class="mb-1"> Status: {row.status}</p>
                <Progressbar class="mb-1 font-normal text-gray-700" progress={successRate(row.successful_landings, row.attempted_landings)} size="h-2.5" labelOutside="Success Rate"/>
                <div class="flex gap-x-2 mt-4">
                    <Button class="mb-1 text-xs text-black px-4 py-3 rounded-md bg-lime-400 hover:text-white"
                    on:click={() => {
                        selectedPad = row;
                        clickOutsideModal = true;
                    }}>View Details</Button>
                    <Button href={row.wikipedia} target="_blank" class="mb-1 text-xs text-white px-4 py-3 rounded-md bg-sky-500 ml-auto">WikiPedia Link</Button>
                </div>
            </div>
        </div>
    {/each}
</div>

<ModalElement {selectedPad} bind:clickOutsideModal {size} />