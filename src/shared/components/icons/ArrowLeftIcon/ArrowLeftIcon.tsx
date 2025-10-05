import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowLeftIcon;
