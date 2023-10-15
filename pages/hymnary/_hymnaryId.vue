<script setup>
import SongEditItem from '~/components/SongEditItem.vue';
import { Drag, DropList, Drop } from 'vue-easy-dnd';
</script>

<template>
  <section>
    <v-card elevation-24 class="pa-4" color="accent" v-if="hymnary.title">
      <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-card-title>{{ hymnary.title }}</v-card-title>
          <v-btn color="primary" text @click="showEditHymnaryDialog"><v-icon>mdi-pencil</v-icon></v-btn>
        </div>
        <v-card-actions>
          <v-btn color="primary" @click="showAddSongDialog">Adicionar música</v-btn>
          <v-btn color="error" @click="deleteHymnaryDialog = true">Deletar hinário</v-btn>
        </v-card-actions>
      </div>
      <v-card-text>Criado em: {{ $formatDateTime(hymnary.created_at) }}</v-card-text>
      <v-card-text>Atualizado em: {{ $formatDateTime(hymnary.updated_at) }}</v-card-text>
      <drop-list :items="hymnary.songs" @insert="onInsert" @reorder="onReorder">
        <template v-slot:item="{ item }">
          <drag :key="item.id">
            <div class="ma-2 drag-container rounded-lg">
              <SongEditItem :song="item" @deleted="deleteSong" />
            </div>
          </drag>
        </template>
      </drop-list>
    </v-card>
    <Loading v-else />

    <v-dialog v-model="editHymnaryDialog" persistent :overlay="true" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title>Editar hinário</v-card-title>
        <v-card-text>
          <v-text-field name="hymnary-title" label="Novo título" id="hymnary-title"
            v-model="newHymnaryTitle"></v-text-field>
          <v-select :items="templates" v-model="newHymnaryTemplate" label="Template"></v-select>
          <v-checkbox label="Exibir categoria" v-model="newHymnaryPrintCategory"></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="editHymnaryDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="updateHymnary()">Atualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteHymnaryDialog" persistent :overlay="true" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title>Deletar hinário</v-card-title>
        <v-card-text>
          <p>Tem certeza que deseja deletar este hinário?</p>
          <p>Esta ação não pode ser desfeita.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="deleteHymnaryDialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="deleteHymnary()">Deletar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addSongDialog" persistent :overlay="true" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title>Adicionar música</v-card-title>
        <v-card-text>Selecione uma música para adicionar ao hinário.</v-card-text>
        <v-card-text class="pb-0">
          <v-select :items="categories" v-model="categorySelect" label="Categoria"></v-select>
        </v-card-text>
        <v-card-text>
          <v-select :items="artists" v-model="artistSelect" label="Artista"></v-select>
        </v-card-text>
        <v-card-text class="pt-0">
          <v-select :items="songs" v-model="songSelect" label="Música"></v-select>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn color="accent" @click="addSongDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="addSong()">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<style scoped>
.drag-source>.drag-container {
  border: 1px dashed #ccc;
}

.drag-source>.drag-container>* {
  opacity: 0;
}
</style>

<script>
export default {
  name: "HymnaryDetail",
  components: {
    SongEditItem,
    Drag, DropList, Drop
  },
  middleware: ["auth"],
  head() {
    return {
      title: this.hymnary.title
    };
  },
  data() {
    return {
      hymnary: {
        title: ""
      },
      templates: [
        {
          text: "Uma coluna",
          value: "single-column"
        },
        {
          text: "Duas colunas",
          value: "two-columns"
        },
        {
          text: "Uma música por página",
          value: "each-song-by-page"
        }
      ],

      editHymnaryDialog: false,
      newHymnaryTitle: "",
      newHymnaryTemplate: "",
      newHymnaryPrintCategory: false,

      deleteHymnaryDialog: false,
      addSongDialog: false,

      categories: [],
      artists: [],
      songs: [],
      categorySelect: "",
      artistSelect: "",
      songSelect: "",
    };
  },
  created() {
    this.isLoading = true;

    this.$axios
      .get("/api/category")
      .then((res) => {
        this.categories = [{ text: "Todas", value: "" }]
        res.data.forEach(category => {
          this.categories.push({
            text: category.name,
            value: category.id
          })
        })
      })

    this.$axios
      .get("/api/artist")
      .then((res) => {
        this.artists = [{ text: "Todos", value: "" }]
        res.data.forEach(artist => {
          this.artists.push({
            text: artist.name,
            value: artist.id
          })
        })
      })

    this.getHymnary();
    this.isLoading = false;
  },
  updated() {
    this.$store.setAppBarTitle(this.hymnary.title);
  },
  methods: {
    getHymnary() {
      this.$axios
        .get(`/api/hymnary/${this.$route.params.hymnaryId}`)
        .then((res) => {
          this.hymnary = res.data;
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível carregar este hinário." + err,
          });
        });
    },

    getSong() {
      this.$axios
        .get(`/api/song?artist_id=${this.artistSelect}&category_id=${this.categorySelect}`)
        .then((res) => {
          this.songs = res.data.map((song) => {
            return {
              text: song.name,
              value: song.id,
            };
          })
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível carregar as músicas.",
          });
        });
    },

    addSong() {
      this.$axios
        .post(`/api/hymnary/${this.$route.params.hymnaryId}/add`, {
          song_id: this.songSelect,
        })
        .then((res) => {
          this.$toasted.global.defaultSuccess({
            msg: "Música adicionada com sucesso.",
          });
          this.hymnary.songs.push(res.data);
          this.addSongDialog = false;
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível adicionar esta música.",
          });
        });
    },

    deleteSong(song_id) {
      this.hymnary.songs = this.hymnary.songs.filter((song) => song.id !== song_id);
    },

    onInsert(event) {
      event.items.splice(event.index, 0, event.data);
      console.log(event)
    },

    onReorder(event) {
      event.items.splice(event.newIndex, 0, event.items.splice(event.oldIndex, 1)[0]);
    },

    updateHymnary() {
      this.hymnary.title = this.newHymnaryTitle;
      this.hymnary.template = this.newHymnaryTemplate;
      this.hymnary.print_category = this.newHymnaryPrintCategory;

      this.$axios
        .put(`/api/hymnary/${this.$route.params.hymnaryId}`, {
          title: this.hymnary.title,
          template: this.hymnary.template,
          print_category: this.hymnary.print_category,
        })
        .then((res) => {
          this.$toasted.global.defaultSuccess({
            msg: "Título do hinário atualizado com sucesso.",
          });
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível atualizar o título deste hinário.",
          });
        });
      this.editHymnaryDialog = false;
    },

    deleteHymnary() {
      this.$axios
        .delete(`/api/hymnary/${this.$route.params.hymnaryId}`)
        .then((res) => {
          this.$toasted.global.defaultSuccess({
            msg: "Hinário deletado com sucesso.",
          });
          this.$router.push("/hymnary");
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível deletar este hinário." + err,
          });
        });
      this.deleteHymnaryDialog = false;
    },

    showEditHymnaryDialog() {
      this.newHymnaryTitle = this.hymnary.title;
      this.newHymnaryTemplate = this.hymnary.template;
      this.newHymnaryPrintCategory = this.hymnary.print_category;
      this.editHymnaryDialog = true;
    },

    showAddSongDialog() {
      this.categorySelect = "";
      this.artistSelect = "";
      this.addSongDialog = true;
    }
  },
  watch: {
    categorySelect() {
      this.getSong();
    },

    artistSelect() {
      console.log(this.artistSelect)
      this.getSong();
    }
  }
}
</script>