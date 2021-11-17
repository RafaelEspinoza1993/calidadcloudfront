<template>
  <div>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modaltype.title }}</p>
          <button type="button" class="delete" @click="ModalStatus(false)" />
        </header>
        <section class="modal-card-body" v-if="modaltype.type !== 3">
          <b-field label="Name">
            <b-input
              type="string"
              :value="modaltype.type == 2 ? userSelected.name : ''"
              v-model="name"
              placeholder="Your Name"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Email">
            <b-input
              type="email"
              :value="modaltype.type == 2 ? userSelected.email : ''"
              v-model="email"
              placeholder="Your email"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Birthday">
            <b-datepicker
              v-model="birthday"
              :append-to-body="true"
              locale="es-MX"
              placeholder="Click to select..."
              trap-focus
            >
            </b-datepicker>
          </b-field>
          <b-field label="password">
            <b-input
              type="password"
              v-model="password"
              value=""
              placeholder="Your password"
              required
            >
            </b-input>
          </b-field>

          <b-field label="Status">
            <b-switch v-model="active" true-value="true" false-value="false">
            </b-switch>
          </b-field>
        </section>
        <section class="modal-card-body" v-else>
          <h1 class="subtitle">
            Your wanna delete the user {{ this.userSelected.name }}?
          </h1>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="ModalStatus(false)" />
          <b-button
            :label="this.modaltype.title"
            type="is-primary"
            @click="PayloadCreate()"
          />
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      name: null,
      email: null,
      birthday: null,
      password: null,
      active: true,
      payload: {
        per_page: 10,
        sort: "id",
        order: "desc",
        page: 1,
      },
    };
  },
  mounted() {
    this.name = this.modaltype.type == 2 ? this.userSelected.name : "";
    this.email = this.modaltype.type == 2 ? this.userSelected.email : "";
    this.active = this.modaltype.type == 2 ? this.userSelected.active : true;
    this.birthday =
      this.modaltype.type == 2
        ? new Date(this.userSelected.birthday)
        : new Date();
  },
  computed: {
    ...mapGetters(["modaltype", "userSelected"]),
  },
  methods: {
    ...mapActions(["ModalStatus", "SendForm", "nextpage"]),
    formatDate(data) {
      let date_ob = new Date(data);
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
      let year = date_ob.getFullYear();
      // prints date & time in YYYY-MM-DD format

      return year + "-" + month + "-" + date;
    },
    PayloadCreate() {
      let payload;
      switch (this.modaltype.type) {
        case 2:
          payload = {
            id: this.userSelected.id,
            name: this.name,
            email: this.email,
            birthday: this.formatDate(this.birthday),
            password: this.password,
            active: this.active == "true" ? true : false,
            type: this.modaltype.type,
          };
          break;
        case 3:
          payload = {
            id: this.userSelected.id,
            type: this.modaltype.type,
          };
          break;
        default:
          payload = {
            name: this.name,
            email: this.email,
            birthday: this.formatDate(this.birthday),
            password: this.password,
            active: this.active == "true" ? true : false,
            type: this.modaltype.type,
          };
          break;
      }
      this.SendForm(payload);
      this.nextpage(this.payload);
    },
  },
};
</script>

<style>
</style>