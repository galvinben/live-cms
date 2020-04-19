<template>
  <div class="container">
    <img
      class="non-admin-image"
      :class="imageClass"
      :src="imgSrc"
      @click="click ? click() : null"
      v-if="!admin"
      @load="fade"
    />
    <img v-if="admin" class="admin-image" :src="imgSrc" @click="edit" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
  data: () => ({
    imageClass: '',
  }),
  props: ['stateRef', 'click', 'size'],
  computed: {
    admin() {
      return this.$store.state.admin
    },
    imgSrc: {
      get: function() {
        return this.$store.state.content.images[this.stateRef]
      },
      // set: function(newValue) {
      //   this.$store.dispatch('content/updateWords', {
      //     stateRef: this.stateRef,
      //     newWords: newValue,
      //   })
      // },
    },
  },
  methods: {
    fade(obj) {
      this.imageClass = 'image-fade'
    },
    edit(event) {
      if (event.shiftKey) {
        this.click ? this.click(event) : null
      } else {
        this.openUploadWidget()
      }
    },
    openUploadWidget() {
      var widget = cloudinary.createUploadWidget(
        {
          cloudName: process.env.cloudinaryName,
          uploadPreset: process.env.cloudinaryPresetSingle,
          multiple: false,
          maxFiles: 1,
          cropping: true,
          croppingAspectRatio: 1,
          showSkipCropButton: false,
          // maxImageWidth: 600,
          // maxImageHeight: 600,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info)
            this.$store.dispatch('content/uploadImage', {
              stateRef: this.stateRef,
              url: result.info.url.replace(
                'upload',
                `upload/c_crop,g_custom/w_${this.size}`
              ),
            })
          }
        }
      )
      widget.open()
    },
  },
}
</script>

<style scoped>
.container,
.non-admin-image,
.admin-image {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  width: 100%;
  height: 100%;
}

.admin-image,
.non-admin-image {
  object-fit: fill;
}

.non-admin-image {
  opacity: 0;
}

.image-fade {
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  0% {
    transform: translate(-5px, 10px) rotate(1deg);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.admin-image:hover {
  opacity: 0.8;
  cursor: pointer;
  display: flex;
}
</style>
