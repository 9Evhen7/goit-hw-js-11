import  Notiflix from "notiflix"

export class Messages { 
    constructor(totalHits) { 
        this.totalHits = totalHits;
    }

    onSuccess() { 
        Notiflix.Notify.success(`Hooray! We found ${this.totalHits} images.`)
    }

    onFail() { 
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    onEnd() { 
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
}