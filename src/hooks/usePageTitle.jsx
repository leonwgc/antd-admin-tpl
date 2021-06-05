import React, { useEffect, useState, useRef } from 'react';
import { setTitle } from '~/utils/helper';

export default function usePageTitle(pageTitle) {
  useEffect(() => {
    setTitle(pageTitle);
  }, [pageTitle]);
}
