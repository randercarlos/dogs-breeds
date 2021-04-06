const helperMixin = {
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    highlight(content) {
      if (!this.search) {
        return content;
      }

      let reg = new RegExp(this.search, 'gi');
      return content.replace(reg, match => {
          return '<span class="highlightText">' + match + '</span>';
      });
    },
  }
}

export default helperMixin;