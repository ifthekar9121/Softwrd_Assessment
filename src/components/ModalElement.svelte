<script>
    import { Modal } from 'flowbite-svelte';
    
    export let selectedPad;
    export let clickOutsideModal;
    export let size;
</script>

<Modal
    title={`Details - ${selectedPad?.full_name}`}
    bind:open={clickOutsideModal}
    {size}
    autoclose
    outsideclose
>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 pb-6">
        {selectedPad?.details}
    </p>
</Modal>
