import { defineStore } from "pinia";
import { useTheme } from "vuetify";

export const useMainStore = defineStore('main', {
	id: 'main',
	store: () => {
		return {
			isDarkTheme: true
		}
	},

	getters: {
		getIsDarkTheme: (state) => () => {
			return state.isDarkTheme;
		}
	},

	actions: {
		setIsDarkTheme(value) {
			this.isDarkTheme = value;
		}
	}

});