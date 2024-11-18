<script>
    import Table from './Table.svelte';
    import Grid from './Grid.svelte';
    import Map from './Map.svelte';
    import Donut from './Donut.svelte';
    import {
        Dropdown,
        DropdownItem,
        Radio,
        Button,
        Modal,
        Progressbar
    } from 'flowbite-svelte';
    import { ListOutline, GridOutline, ChevronDownOutline, AdjustmentsVerticalOutline, LinkOutline } from 'flowbite-svelte-icons';

    let { data } = $props();
    const landingPads = data.data;
    let selectedStatus = $state("all");

    const uniqueStatuses = $derived(["all", ...new Set(landingPads.map((pad) => pad.status))]);

    function handleStatusChange(event) {
        selectedStatus = event.target.value;
    }

    const  filteredPads = $derived(selectedStatus === "all"
        ? landingPads
        : landingPads.filter((pad) => pad.status === selectedStatus));

    let isOpen = $state(false);
    function toggleDropdown() {
        isOpen = !isOpen;
    }

    let viewMode = $state("list");

    function toggleViewMode(mode) {
        viewMode = mode;
    }

</script>
  
<div class="container mt-8 mx-auto">
    <div class="grid grid-cols-4 gap-4 mx-4 mb-4">
        <div class="col-span-4 lg:col-span-3">
            <div class="flex mb-2">
                <div class="flex border border-gray-200 rounded-md">
                    <button class="flex p-2.5 border-r border-gray-200 {viewMode === 'list' ? 'active-element' : 'btn-element'}" onclick={() => toggleViewMode("list")}>
                        <ListOutline class="size-4"/>
                    </button>
                    <button class="flex p-2.5 {viewMode === 'grid' ? 'active-element' : 'btn-element'}" onclick={() => toggleViewMode("grid")}>
                        <GridOutline class="size-4"/>
                    </button>
                </div>
                
                <div class="flex ml-auto relative">
                    <Button class="w-52 p-2.5 capitalize text-sm border border-gray 200 text-gray-800 rounded-md bg-gray-200 btn-element {isOpen ? "active-element" : ""}" onclick={toggleDropdown}><AdjustmentsVerticalOutline class="me-2 size-4"/> {selectedStatus === "all"
                        ? "Filter By  Status" : selectedStatus}<ChevronDownOutline class="size-4 ms-2" style="transform: rotate({isOpen ? 180 : 0}deg);"/></Button>
                    <Dropdown class="absolute -ml-24 z-10 bg-white border border-gray-200 rounded-md shadow-lg w-48">
                        {#each uniqueStatuses as status}
                            <DropdownItem>
                                <Radio
                                    name="statusFilter"
                                    value={status}
                                    checked={selectedStatus === status}
                                    on:change={handleStatusChange}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </Radio>
                            </DropdownItem>
                        {/each}
                    </Dropdown>
                </div>
            </div>
            {#if viewMode === "list"}
                <Table {filteredPads} />
            {:else if viewMode === "grid"}
                <Grid {filteredPads} />
            {/if}
        </div>
        <div class="col-span-4 lg:col-span-1">
            <div class="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div class="card-components rounded-lg">
                    <Map {filteredPads}/>
                </div>
                <div class="card-components rounded-lg">
                    <Donut {landingPads}/>
                </div>
            </div>
        </div>
    </div>
</div>