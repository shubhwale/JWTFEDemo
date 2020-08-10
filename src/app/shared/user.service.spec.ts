import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

describe('UserService', () => {
    let service: UserService;
    let testLoginModel = {
        email: '',
        password: ''
    }
    let validEmail: string;
    let validPassword: string;
    let invalidPassword: string;
    let result: Observable<Object>;

    function updateForm(email, password) {
        testLoginModel.email = email;
        testLoginModel.password = password;
    }

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });
        service = TestBed.inject(UserService);
        validEmail = 'manjiri@email.com';
        validPassword = 'manjiri123';
        invalidPassword = 'manjiri12';
    });

    beforeEach(() => {
        result = null;
    });

    afterAll(() => {
        service = null;
        updateForm('', '');
        validEmail = '';
        validPassword = '';
        invalidPassword = '';
        result = null;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return http status 200 on right login credentials', () => {
        updateForm(validEmail, validPassword);
        result = service.login(testLoginModel);
        result.subscribe(() => {
            err => {
                expect(err.status).toBe(200);
            }
        });
    });

    it('should return http status 401 on wrong login credentials', () => {
        updateForm(validEmail, invalidPassword);
        result = service.login(testLoginModel);
        result.subscribe(() => {
            err => {
                expect(err.status).toBe(401);
            }
        });
    });
});