'use client';

import { useState } from 'react';

export const useNavbar = () => {
  const [active, setActive] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  return { active, setActive, showMenu, setShowMenu };
};
