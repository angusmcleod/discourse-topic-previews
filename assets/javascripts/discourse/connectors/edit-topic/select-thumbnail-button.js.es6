import { ajax } from 'discourse/lib/ajax';
import { popupAjaxError } from 'discourse/lib/ajax-error';
import showModal from "discourse/lib/show-modal";
import { default as computed, on, observes } from 'ember-addons/ember-computed-decorators';

export default {
  actions: {
    showThumbnailSelector() {
      var topic_id = this.get('model.id');
      var topic_title = this.get('model.title');
      var buffered = this.get('buffered');

      ajax(`/topic-previews/thumbnail-selection.json?topic=${topic_id}`).then(result => {
        var controller = showModal('tlp-thumbnail-selector', { model: {
          thumbnails: result,
          topic_id: topic_id,
          topic_title: topic_title,
          buffered: buffered
          }}
        );
      }).catch(function(error) {
               popupAjaxError(error);
      });
    }
  }
}