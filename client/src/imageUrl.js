// global.img_url = 'http://greatpharma.org/pos_server/public';
// global.img_url = 'http://localhost/mhp-pos/pos_server/public';

{process.env.NODE_ENV === 'development' ? global.img_Url =  process.env.REACT_APP_DEV_MODE_IMAGE_URL : global.img_Url =  process.env.REACT_APP_PRO_MODE_IMAGE_URL}
