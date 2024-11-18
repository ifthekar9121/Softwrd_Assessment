<script>
    import ModalElement from './ModalElement.svelte';
    import { 
        Button,
        Progressbar,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import { successRate } from '$lib';
    import { LinkOutline } from 'flowbite-svelte-icons';

    let clickOutsideModal = false;
    let size = 'sm';
    let selectedPad = null;

    export let filteredPads;
</script>

<Table class="border capitalize font-semibold text-sm text-gray-900">
    <TableHead class="text-gray-500 text-xs">
        <TableHeadCell>Full Name</TableHeadCell>
        <TableHeadCell>Location Name</TableHeadCell>
        <TableHeadCell>Region</TableHeadCell>
        <TableHeadCell>Details</TableHeadCell>
        <TableHeadCell>Success Rate</TableHeadCell>
        <TableHeadCell>WikiPedia Link</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredPads as row}
            <TableBodyRow>
                <TableBodyCell>{row.full_name}</TableBodyCell>
                <TableBodyCell>{row.location.name}</TableBodyCell>
                <TableBodyCell>{row.location.region}</TableBodyCell>
                <TableBodyCell>
                    <Button
                        class="text-xs text-gray-900 px-1.5 py-0.5 rounded-md bg-gray-100"
                        on:click={() => {
                            selectedPad = row;
                            clickOutsideModal = true;
                        }}
                    >
                        View Details
                    </Button>
                </TableBodyCell>
                <TableBodyCell class="text-gray-500 font-medium text-xs">
                    {#if row.successful_landings == 0 || row.attempted_landings == 0}
                        N/A
                    {:else}
                        <Progressbar progress={successRate(row.successful_landings, row.attempted_landings)} shadow="#ffffff" color="green" size="h-1.5" />
                        {successRate(row.successful_landings, row.attempted_landings)}%
                    {/if}
                </TableBodyCell>
                <TableBodyCell class="text-primary-600">
                    <a href="{row.wikipedia}" target="_blank">
                        <LinkOutline />
                    </a>
                </TableBodyCell>
                <TableBodyCell>
                    <p 
                        class="py-0.5 px-1.5 font-medium rounded-md inline" 
                        class:status-retired={row.status === 'retired'} 
                        class:status-active={row.status === 'active'} 
                        class:status-under-construction={row.status !== 'retired' && row.status !== 'active'}
                    >
                        {row.status}
                    </p>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>

<ModalElement {selectedPad} bind:clickOutsideModal {size} />
