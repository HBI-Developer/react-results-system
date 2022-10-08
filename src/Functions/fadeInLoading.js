import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
export default function fadeInLoading (type) {
    $('.loading-screen').fadeIn(400, () => {
        let pathName = '';
        switch (type) {
            case 'root': {pathName = '/'; break;}
            case 'admin-login': {pathName = '/admin-login'; break;}
            case 'student-login': {pathName = '/student-login'; break;}
            case 'statistics': {pathName = '/statistics'; break;}
            case 'students': {pathName = '/students'; break;}
            case 'subjects': {pathName = '/subjects'; break;}
            case 'degrees': {pathName = '/degrees'; break;}
            case 'admin-page': {pathName = '/admin-page'; break;}
            case 'student-page': {pathName = '/student-page'; break;}
            case 'certificate': {pathName = '/certificate'; break;}
            default: {}
        }

        const navigate = useNavigate();

        navigate(pathName);
    });
}