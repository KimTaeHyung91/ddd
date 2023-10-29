import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseResponse } from './base/response/base-response';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toMatchObject(
        BaseResponse.success({ text: 'Hello World!' }),
      );
    });

    it('should return Fail', () => {
      expect(appController.getHello2()).toMatchObject(
        BaseResponse.fail('fail', '404000'),
      );
    });
  });
});
