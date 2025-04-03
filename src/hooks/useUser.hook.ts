import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../store/store';


function useUser() {
    const dispatch = useDispatch<AppDispatch>();
}

export default useUser;