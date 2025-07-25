const { createBug, getAllBugs } = require('../controllers/bugController');
const Bug = require('../models/bugModel');

jest.mock('../models/bugModel');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('createBug', () => {
  it('should create a bug and return 201 status', async () => {
    const req = {
      body: {
        title: 'Unit test bug',
        description: 'Bug created in unit test',
        priority: 'medium',
      },
    };
    const res = mockRes();

    const fakeBug = {
      _id: '123',
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: 'open',
    };

    Bug.create = jest.fn().mockResolvedValue(fakeBug);

    await createBug(req, res);

    expect(Bug.create).toHaveBeenCalledWith({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Unit test bug',
    }));
  });
});

describe('getBugs', () => {
  it('should return all bugs with status 200', async () => {
    const req = {};
    const res = mockRes();

    const fakeBugs = [
      { title: 'Bug 1', description: 'First bug' },
      { title: 'Bug 2', description: 'Second bug' },
    ];

    // Mock the chained find().sort()
    const sortMock = jest.fn().mockResolvedValue(fakeBugs);
    Bug.find = jest.fn(() => ({ sort: sortMock }));

    await getAllBugs(req, res);

    expect(Bug.find).toHaveBeenCalled();
    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeBugs);
  });
});
