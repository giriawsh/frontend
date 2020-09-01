<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-card justify="start" align="start">
      <v-card-title class="grey darken-4" style="color: white;" v-text="title">
      </v-card-title>
<!--      <v-card-text>-->
<!--        <v-flex lg12>-->
<!--          <v-card>-->
<!--            <v-toolbar card>-->
<!--              <v-text-field-->
<!--                v-model="search"-->
<!--                flat-->
<!--                solo-->
<!--                prepend-icon="mdi-magnify"-->
<!--                hide-details-->
<!--                class="hidden-sm-and-down"-->
<!--              >-->
<!--              </v-text-field>-->
<!--            </v-toolbar>-->
<!--            <v-card-text class="pa-0">-->
<!--              <v-data-table-->
<!--                v-model="data.selected"-->
<!--                :headers="data.headers"-->
<!--                :search="search"-->
<!--                :items="user"-->
<!--                :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"-->
<!--                class="elevation-1"-->
<!--                item-key="name"-->
<!--              >-->
<!--                <template slot="items" slot-scope="props">-->
<!--                  <td>-->
<!--                    <v-avatar-->
<!--                      slot="avatar"-->
<!--                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"-->
<!--                      alt="User"-->
<!--                      size="32"-->
<!--                    />-->
<!--                  </td>-->
<!--                  <td>-->
<!--                    {{props.item.username}}-->
<!--                  </td>-->
<!--                  <td>-->
<!--                    {{props.item.authority}}-->
<!--                  </td>-->
<!--                </template>-->
<!--              </v-data-table>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-flex>-->
<!--      </v-card-text>-->
        <v-data-table
          :headers="data.headers"
          :items="user"
          class="elevation-1"
        >
          <template v-slot:top>
              <v-dialog v-if="dialog" max-width="500px">
                <template v-slot:activator="{on, attrs}">
                  <v-card>
                    <v-card-title>
                      <span class="headline">编辑用户权限</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12">
<!--                            <v-text-field v-model="editedIndex.authority" >-->
<!--                            </v-text-field>-->
                            <v-select
                              :items="selectItems"
                              label="Authority"
                              outlined
                              v-model="selectAuth"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer>
                      </v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>

              </v-dialog>
          </template>
          <template v-slot:item.actions="{item}">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
    </v-card>
  </v-col>
</template>
<script>
  import axios from "~/plugins/axios";

  export default {
    name: 'CoreManager',
    data() {
      return {
        title: "管理用户",
        user: [],
        selectItems: [
          'admin',
          'user'
        ],
        selectAuth: "",
        data: {
          selected: [],
          headers: [
            {
              text: "Username",
              value: "username",
              sortable: false
            },
            {
              text: "Authority",
              value: "authority",
              sortable: false
            },
            {
              text: "Action",
              value: "actions",
              sortable: false
            }
          ]
        },
        editedItem: {
          username: "",
          authority: "",
        },
        defaultItem: {
          username: "",
          authority: "",
        },
        editedIndex: -1,
        dialog: false,
      }
    },
    async mounted() {
      let response = await axios.get('/users');
      let length = response['_embedded']['users'].length;
      for (let i = 0; i < length; i++) {
        let name = response['_embedded']['users'][i]['username'];
        // console.log("name="+name);
        let authHref = await axios.get(response['_embedded']['users'][i]['_links']['authorities']['href']);
        let authority = authHref['_embedded']['authorities'][0]['authority'];
        // console.log("auth="+authority);
        this.user.push({
          username: name,
          authority: authority
        })
      }
    },
    methods:{
      editItem(item){
        this.editedIndex = this.user.indexOf(item);
        this.editedItem = Object.assign({}, item);
        console.log("index="+this.editedIndex);
        console.log(this.editedItem);
        this.dialog = true;
      },
      close(){
        this.dialog=false;
        this.$nextTick(()=>{
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },
      async save(){
        if(this.editedIndex > -1){
          this.user[this.editedIndex].authority = this.selectAuth;
          let authArray = ['http://localhost:8091/api/authorities/' + this.selectAuth];
          let response = await axios.patch(`/users/${this.user[this.editedIndex].username}`, {
            authorities: authArray,
          });
          this.selectAuth = "";
        }else{
          alert("error");
        }
        this.close();
      }
    },

  }
</script>
