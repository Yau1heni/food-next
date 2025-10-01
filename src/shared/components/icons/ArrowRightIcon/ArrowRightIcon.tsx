import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default ArrowRightIcon;
