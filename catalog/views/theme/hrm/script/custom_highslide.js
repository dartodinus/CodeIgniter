var geturl 			= location.href;
var baseLocalUrl 	= geturl.substring(0, geturl.indexOf('/', 14))+'/jsm/';

hs.graphicsDir = baseLocalUrl+'catalog/views/theme/hrm/images/graphics/';
hs.outlineType = 'rounded-white';
hs.showCredits = false;
hs.wrapperClassName = 'draggable-header';
hs.width = 870;
hs.objectHeight = 500;
hs.objectLoadTime = 'after';