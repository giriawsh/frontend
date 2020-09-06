<template>
  <v-col
    cols="12"
    md="8"
  >
    <v-card justify="start" align="start">
      <v-card-title class="grey darken-4" style="color: white;" v-text="title">
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="data.headers"
          :items="user"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Manage Users</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
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
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{item}">
            <v-icon
              small
              class="mr-2"
              @click="editUser(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteUser(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
      <v-spacer>
      </v-spacer>
      <v-card-text>
        <v-data-table
          :headers="data.topic"
          :items="topic"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Manage Topic</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogTopic" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >New Topic</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12">
                          <v-text-field v-model="editedTopic" label="input topic name" outlined>
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer>
                    </v-spacer>
                    <v-btn color="blue darken-1" text @click="closeTopic">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveTopic">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{item}">
            <v-icon
              small
              class="mr-2"
              @click="deleteTopic(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
  import axios from "~/plugins/axios";

  export default {
    name: 'CoreManager',
    data() {
      return {
        title: "管理员界面",
        user: [],
        topic: [],
        selectItems: [
          'admin',
          'user'
        ],
        selectAuth: "",
        editedTopic: "",
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
          ],
          topic: [
            {
              text: "TopicName",
              value: "topic",
              sortable: false
            },
            {
              text: "Action",
              value: "actions",
              sortable: false
            }
          ],
        },
        editedItem: {
          username: "",
          authority: "",
        },
        editedTopicItem: {
          topic: ""
        },
        defaultItem: {
          username: "",
          authority: "",
        },
        defaultTopicItem: {
          topic: "",
        },
        editedIndex: -1,
        topicEditedIndex: -1,
        dialog: false,
        dialogTopic: false,
      }
    },
    mounted() {
      if(this.$store.state.authority !== 'admin')
      {
        alert("no permission!");
        this.$router.push("/");
      }
      this.init();
    },
    computed: {
      formTitle() {
        return this.topicEditedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    methods: {
      async init() {
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
        let topics = await axios({
          url: '/topics',
          method: 'get',
        });
        let len = topics['_embedded']['topics'].length;
        let topicArray = [];
        for (let i = 0; i < len; i++) {
          topicArray.push({ topic: topics['_embedded']['topics'][i]['title']});
        }
        this.topic = topicArray;
      },
      editUser(item) {
        this.editedIndex = this.user.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      editTopic(item) {
        this.topicEditedIndex = this.topic.indexOf(item);
        this.editedTopicItem = Object.assign({}, item);
        this.dialogTopic = true;
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },
      closeTopic() {
        this.dialogTopic = false;
        this.$nextTick(() => {
          this.editedTopicItem = Object.assign({}, this.defaultTopicItem);
          this.topicEditedIndex = -1;
        })
      },
      async save() {
        if (this.editedIndex > -1) {
          this.user[this.editedIndex].authority = this.selectAuth;
          let authArray = ['http://localhost:8091/api/authorities/' + this.selectAuth];
          let response = await axios.patch(`/users/${this.user[this.editedIndex].username}`, {
            authorities: authArray,
          });
          this.selectAuth = "";
        } else {
          alert("error");
        }
        this.close();
      },
      async saveTopic() {
        if (this.topicEditedIndex >= 0) {
        } else if(this.topicEditedIndex === -1) {
          this.editedTopicItem = {
            topic: this.editedTopic
          };
          let response = await axios.post('/topics', {
            title: this.editedTopic,
          });
          this.topic.push(this.editedTopicItem);
        }else{
          alert("error!");
        }
        this.dialogTopic = false;
      },
      async deleteTopic(item){
        const index = this.topic.indexOf(item);
        if(confirm('确定要删除这个板块吗?')){
          let response = await axios.delete(`/topics/${this.topic[index]['topic']}`);
          this.topic.splice(index, 1);
        }
      },
      async deleteUser(item){
        const index = this.user.indexOf(item);
        if(confirm('确定要删除这个用户吗?')){
          let response = await axios.delete(`/users/${this.user[index].username}`);
          this.user.splice(index, 1);
        }
      }
    },

  }
</script>
