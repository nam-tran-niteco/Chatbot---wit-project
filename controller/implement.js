'use strict';

/**
 * Implement all function that set up in wit.ai
 */

functionImplement = {
    getContact({context, entities}) {
        var contact = _this.firstEntityValue(entities, 'contactinfo');
        context.contact = 'người bạn tên là ' + contact;
        return context;
    }
}