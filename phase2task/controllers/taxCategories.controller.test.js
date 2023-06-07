const controller = require('./taxCategories.controller');
const tax = require('../models').taxCategories;

const mockRequest=()=>{
    const req={};
    req.body = jest.fn().mockReturnValue(req);
    req.params= jest.fn().mockReturnValue(req);
    return req;
}
const mockResponse=()=>{
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json =  jest.fn().mockReturnValue(res); 
    return res;
}
jest.setTimeout(1000000);
describe('employee Controller', () =>{
    beforeEach(async () =>{
     jest.restoreAllMocks();
    });
test('should return all categories', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockCategories = ['category1', 'category2'];
    const mockService = {
      getAllCategories: jest.fn().mockResolvedValue(mockCategories),
    };

    await controller.findAllCategory(req, res, mockService);

    expect(mockService.getAllCategories).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  test('should handle error', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockError = new Error('Unable to fetch categories');
    const mockService = {
      getAllCategories: jest.fn().mockRejectedValue(mockError),
    };

    await controller.findAllCategory(req, res, mockService);

    expect(mockService.getAllCategories).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(422);
    expect(res.send).toHaveBeenCalledWith('Unable to fetch categories');
  });
});