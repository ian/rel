<script lang="ts">
  import { Note, createClient } from '../../../gql-client'
  import { onMount } from 'svelte'
  
  let archived = false
  let text = 'Foo' 

  const client = createClient({ 
    url: 'http://127.0.0.1:4000/graphql', 
    subscription: {url: 'ws://127.0.0.1:4000/graphql'}
  })
  let notes: Note[] = []
  
  async function reloadNotes() {
    notes = await client.chain.query
      .findNotes()
      .items.get({ id: true, text: true, archived: true, __typename: true })
  }

  onMount(async () => {
    await client.subscription({
      newNote: {
        id: true
      }
    }).subscribe({
        next: ({newNote}) => {
          console.log('next', newNote)
        },
        error: console.error
    })

    await client.subscription({
      deletedNote: {
        __scalar: true
      }
    }).subscribe({
        next: ({deletedNote}) => {
          console.log('next', deletedNote)
        },
        error: console.error
    })
    
    await reloadNotes()
  })
  async function handleSubmit() {
    await client.mutation({
      createNote: [{ input: { text, archived } }, { id: true }]
    })

    await reloadNotes()
  }

  async function deleteNote(id: string) {
    await client.mutation({
      deleteNote: [{ input: { id } }, {__scalar: true}]
    })
    await reloadNotes()
  }
</script>

<main>
  <h1>Notes App!</h1>
  <h4>{notes?.length || 0} created</h4>
  {#each notes as note}
    <li>
      ID: {note.id}, Text: {note.text}, Archived?: {note.archived}
      <button on:click={() => deleteNote(note.id)}>X</button>
    </li>
  {/each}
  <div>
    <form on:submit|preventDefault={handleSubmit}>
      <div>
        <label for="text">Text</label>
        <input name="text" bind:value={text} />
      </div>
      <div>
        <label for="archived">Archived?</label>
        <input type="checkbox" bind:checked={archived} />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
