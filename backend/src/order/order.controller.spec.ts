import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';


describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test
            .createTestingModule({
              controllers: [OrderController],
              providers: [OrderService],
            })
            .overrideProvider(OrderService)
            .useValue({
                createOrder: jest.fn().mockResolvedValue({
                    total: 0,
                    items: [],
                    errors: undefined,
                    }),
            })
            .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    orderService = moduleRef.get<OrderService>(OrderService); 
  });

  it('.createOrder() должен вызвать метод createOrder сервиса orderService', async () => {
    const mockOrder = {
        email: 'test@gmail.com',
        phone: '+79333333333',
        tickets: []
    };

    await orderController.createOrder(mockOrder);

    expect(orderService.createOrder).toHaveBeenCalledWith(mockOrder);
  });
});