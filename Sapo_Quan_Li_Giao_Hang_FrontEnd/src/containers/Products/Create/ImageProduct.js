import React from 'react';

const ImageProduct = (props) => {
  const { imagesUpdate, imagePreview } = props;
  const showImage = () => {
    let rs = null;
    if (imagePreview.length > 1) {
      rs = imagePreview.map((image, index) => {
        if (index !== 0) {
          return (
            <div className='image-nex' key={index}>
              <img
                className='mb-3 fadeIn'
                width='100%'
                src={image.base64}
                alt=''
              ></img>
              <div
                class='middle'
                onClick={() => {
                  props.removeImage(image.name, index);
                }}
              >
                <i class='fa fa-trash'></i>
              </div>
            </div>
          );
        }
      });
    }
    return rs;
  };
  const showImageU = () => {
    let rs = null;
    if (props.match !== undefined) {
      if (imagesUpdate.length === 1) {
        rs = (
          <div className='d-flex'>
            <div className='image-first' style={{ width: '50%' }}>
              <img
                alt=''
                src={`https://firebasestorage.googleapis.com/v0/b/quan-li-giao-hang.appspot.com/o/images%2F${imagesUpdate[0]}?alt=media&token=a84fcb01-ab59-409b-8ad9-93e8a96332fc`}
                style={{ width: '100%' }}
              />
              <div
                class='middle'
                onClick={() => {
                  props.removeImage(imagesUpdate[0]);
                }}
              >
                <i class='fa fa-trash'></i>
              </div>
            </div>
          </div>
        );
      }
      if (imagesUpdate.length > 1) {
        rs = (
          <div className='d-flex'>
            <div className='image-first' style={{ width: '50%' }}>
              <img
                alt=''
                className='image'
                src={`https://firebasestorage.googleapis.com/v0/b/quan-li-giao-hang.appspot.com/o/images%2F${imagesUpdate[0]}?alt=media&token=a84fcb01-ab59-409b-8ad9-93e8a96332fc`}
                style={{ width: '100%' }}
              />
              <div
                class='middle'
                onClick={() => {
                  props.removeImage(imagesUpdate[0]);
                }}
              >
                <i class='fa fa-trash'></i>
              </div>
            </div>
            <div
              className='image-nexs float-right'
              style={{ width: '50%', paddingLeft: 5 }}
            >
              {showImagesUpdate()}
            </div>
          </div>
        );
      }
    } else {
      if (imagePreview.length > 0) {
        if (imagePreview.length > 1) {
          rs = (
            <div className='d-flex'>
              <div className='image-first' style={{ width: '50%' }}>
                <img
                  alt=''
                  src={imagePreview[0].base64}
                  style={{ width: '100%' }}
                />
                <div
                  class='middle'
                  onClick={() => {
                    props.removeImage(imagePreview[0].name);
                  }}
                >
                  <i class='fa fa-trash'></i>
                </div>
              </div>

              <div
                className='image-nexs float-right'
                style={{ width: '50%', paddingLeft: 5 }}
              >
                {showImage()}
              </div>
            </div>
          );
        } else {
          rs = (
            <div className='d-flex'>
              <div className='image-first' style={{ width: '50%' }}>
                <img
                  alt=''
                  src={imagePreview[0].base64}
                  style={{ width: '100%' }}
                />
                <div
                  class='middle'
                  onClick={() => {
                    props.removeImage(imagePreview[0].name);
                  }}
                >
                  <i class='fa fa-trash'></i>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    return rs;
  };
  const showImagesUpdate = () => {
    let rs = null;
    rs = imagesUpdate.map((img, index) => {
      if (index !== 0) {
        return (
          <div className='image-nex'>
            <div className='d-flex'>
              <img
                className='mb-3 fadeIn'
                width='100%'
                src={`https://firebasestorage.googleapis.com/v0/b/quan-li-giao-hang.appspot.com/o/images%2F${img}?alt=media&token=a84fcb01-ab59-409b-8ad9-93e8a96332fc`}
                alt=''
              ></img>
              <div
                class='middle'
                onClick={() => {
                  props.removeImage(img);
                }}
              >
                <i class='fa fa-trash'></i>
              </div>
            </div>
          </div>
        );
      }
    });
    return rs;
  };
  return <React.Fragment>{showImageU()}</React.Fragment>;
};

export default ImageProduct;
