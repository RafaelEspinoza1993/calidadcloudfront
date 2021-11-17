<template>
  <div class="list">
    <b-modal v-model="modal" has-modal-card :can-cancel="false">
      <DetailComponent />
    </b-modal>
    <section>
      <b-table
        :data="users"
        :loading="loading"
        paginated
        backend-pagination
        :total="last_page"
        :per-page="payload.per_page"
        @page-change="onPageChange"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        backend-sorting
        :default-sort-direction="defaultSortOrder"
        :default-sort="[sortField, sortOrder]"
        @sort="onSort"
      >
        <b-table-column field="id" label="ID" sortable v-slot="props">
          {{ props.row.data.id }}
        </b-table-column>
        <b-table-column field="name" label="Name" sortable v-slot="props">
          {{ props.row.data.name }}
        </b-table-column>
        <b-table-column field="email" label="Email" sortable v-slot="props">
          {{ props.row.data.email }}
        </b-table-column>
        <b-table-column
          field="birthday"
          label="Birthday"
          sortable
          v-slot="props"
        >
          {{ props.row.data.birthday }}
        </b-table-column>
        <b-table-column field="active" label="Active" sortable v-slot="props">
          <b-icon
            :icon="props.row.data.active == 1 ? 'account-check' : 'account-cancel'"
            :type="props.row.data.active == 1 ? 'is-success' : 'is-danger'"
          >
          </b-icon>
        </b-table-column>
        <b-table-column
          field="created_at"
          label="Create Date"
          sortable
          v-slot="props"
        >
          <span class="tag is-success">{{
            formatDate(props.row.data.created_at)
          }}</span>
        </b-table-column>
        <b-table-column
          field="updated_at"
          label="Update Date"
          sortable
          v-slot="props"
        >
          <span class="tag is-success">{{
            formatDate(props.row.data.updated_at)
          }}</span>
        </b-table-column>
        <b-table-column
          field="deleted_at"
          label="Delete Date"
          sortable
          v-slot="props"
        >
          <span class="tag is-danger">{{
            props.row.data.deleted_at ? formatDate(props.row.data.deleted_at) : ""
          }}</span>
        </b-table-column>
        <b-table-column field="create" label="Create" v-slot="props">
          <b-button
            @click="formmethod(props.row.create, props.row)"
            type="is-success"
            outlined
            >Create</b-button
          >
        </b-table-column>
        <b-table-column field="edit" label="Edit" v-slot="props">
          <b-button
            @click="formmethod(props.row.edit,props.row)"
            type="is-warning"
            outlined
            >Edit</b-button
          >
        </b-table-column>
        <b-table-column field="delete" label="Delete" v-slot="props">
          <b-button
            @click="formmethod(props.row.delete,props.row)"
            type="is-danger"
            outlined
            >Delete</b-button
          >
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import DetailComponent from "./DetailComponent.vue";
export default {
  name: "List",
  components: {
    DetailComponent,
  },
  data() {
    return {
      total: 0,
      loading: false,
      sortField: "id",
      sortOrder: "desc",
      defaultSortOrder: "desc",
      payload: {
        per_page: 10,
        sort: "id",
        order: "desc",
        page: 1,
      },
    };
  },
  mounted() {
    this.nextpage(this.payload);
  },
  computed: {
    ...mapGetters(["users", "current_page", "from", "to", "last_page", "modal"]),
  },
  methods: {
    ...mapActions(["nextpage", "ModalType", 'ModalStatus']),
    formatDate(data) {
      let date_ob = new Date(data);
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
      let year = date_ob.getFullYear();

      // current hours
      let hours = date_ob.getHours();

      // current minutes
      let minutes = date_ob.getMinutes();

      // current seconds
      let seconds = date_ob.getSeconds();

      // prints date & time in YYYY-MM-DD HH:MM:SS format

      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    formmethod(type, data) {
        this.ModalType({
            type: type,
            data: data
        });
        this.ModalStatus(true);
    },
    onPageChange(page) {
      this.payload.page = page;
      this.nextpage(this.payload);
    },
    /*
     * Handle sort event
     */
    onSort(field, order) {
      this.loading = true;
      this.sortField = field;
      this.sortOrder = order;
      this.payload.sort = field;
      this.payload.order = order;
      this.nextpage(this.payload);
      this.loading = false;
    },
  },
};
</script>

<style>
</style>