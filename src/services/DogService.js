import axios from '@/utils/http-config';

class DogService {

	loadBreeds() {
		return axios.get(`breeds/list/all`);
	}

	loadSubbreedsFromBreed(breed) {
		return axios.get(`/breed/${breed}/list`);
	}


	loadRandomImageFromBreed(breed) {
		return axios.get(`/breed/${breed}/images/random`);
	}


}

export default new DogService();
