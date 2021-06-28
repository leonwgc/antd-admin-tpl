import React from 'react';
import { useLocation } from 'react-router-dom';
import { getURLParams } from '~/utils/helper';
import './Outside.less';

const Outside = () => {
  const { search } = useLocation();

  if (search.length) {
    const { url } = getURLParams(search);

    if (url && url.startsWith('http')) {
      return <iframe className="outside-iframe" frameBorder="none" src={url}></iframe>;
    }
  }

  return null;
};

export default Outside;
