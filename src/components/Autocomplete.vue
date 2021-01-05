<template>
  <div class="search">
    <h2>MOVIE NAME</h2>
    <div class="autocomplete">
      <div
        class="input"
        @click="toggleVisible"
        v-text="selectedItem ? selectedItem[filterby] : ''"
      ></div>
      <div class="placeholder" v-if="selectedItem == null" v-text="title"></div>
      <button class="close" @click="selectedItem = null" v-if="selectedItem">
        x
      </button>
      <div class="popover" v-show="visible">
        <input
          type="text"
          ref="input"
          v-model="query"
          @keydown.up="up"
          @keydown.down="down"
          placeholder="Start Typing..."
          @keyup="change"
        />
        <div class="options" ref="optionsList">
          <ul>
            <li
              v-for="(match, index) in matches"
              :key="index"
              :class="{ selected: selected == index }"
              @click="itemClicked(index)"
              v-text="match[filterby]"
            ></li>
          </ul>
        </div>
      </div>
    </div>
    <input @click="sendItem" type="submit" value="SEARCH" />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default() {
        return [];
      },
      type: Array,
    },
    filterby: {
      type: String,
    },
    title: {
      default: "Select One...",
      type: String,
    },
    shouldReset: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemHeight: 39,
      selectedItem: null,
      selected: 0,
      query: "",
      visible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 50);
    },
    itemClicked(index) {
      this.selected = index;
      this.selectItem();
    },
    selectItem() {
      if (!this.matches.length) {
        return;
      }
      this.selectedItem = this.matches[this.selected];
      this.visible = false;
      if (this.shouldReset) {
        this.query = "";
        this.selected = 0;
      }
    },
    sendItem() {
      this.$emit("selected", JSON.parse(JSON.stringify(this.selectedItem)));
    },
    up() {
      if (this.selected == 0) {
        return;
      }
      this.selected -= 1;
      this.scrollToItem();
    },
    down() {
      if (this.selected >= this.matches.length - 1) {
        return;
      }
      this.selected += 1;
      this.scrollToItem();
    },
    scrollToItem() {
      this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
    },
    change(event) {
      this.query = event.target.value;
      this.$emit("change", this.query);
    },
  },
  computed: {
    matches() {
      if (this.query == "") {
        return [];
      }
      return this.items.filter((item) =>
        item[this.filterby].toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  margin-bottom: 20px;
}

h2 {
  margin: 10px 10px;
  padding: 5px;
}

input[type="submit"]{
  margin: 0px 10px;
  height: 52px;
  width: 100px;
  border-radius: 25px;
}

input[type="submit"]:focus {
   outline: none;
  }

.autocomplete {
  width: 60%;
  position: relative;
}
.input {
  height: 40px;
  border-radius: 25px;
  border: 2px solid lightgray;
  box-shadow: 0 0 10px #eceaea;
  font-size: 25px;
  padding-left: 10px;
  padding-top: 10px;
  cursor: text;
  background: white;
}
.close {
  position: absolute;
  right: 2px;
  top: 4px;
  background: none;
  border: none;
  font-size: 30px;
  color: lightgrey;
  cursor: pointer;
}
.placeholder {
  position: absolute;
  top: 11px;
  left: 11px;
  font-size: 25px;
  color: #d0d0d0;
  pointer-events: none;
}
.popover {
  min-height: 50px;
  border: 2px solid lightgray;
  position: absolute;
  top: 46px;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 25px;
  text-align: center;
}
.popover input {
  width: 95%;
  margin-top: 5px;
  height: 40px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid lightgray;
  padding-left: 8px;
  outline: none;
}
.options {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
  border-radius: 25px;
}
.options ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
}
.options ul li {
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
  background: #f1f1f1;
}
.options ul li:first-child {
  border-top: 2px solid #d6d6d6;
}
.options ul li:not(.selected):hover {
  background: #8c8c8c;
  color: #fff;
}
.options ul li.selected {
  background: #58bd4c;
  color: #fff;
  font-weight: 600;
}

@media only screen and (max-width: 600px) {
  .search {
  display: block;
  margin-bottom: 20px;
  text-align: center;
}

input[type="submit"]{
  margin: 10px 10px;
  height: 52px;
  width: 100px;
  border-radius: 25px;
}

.autocomplete {
  width: 100%;
  position: relative;
}
.input {
  font-size: 15px;
}
}
</style>