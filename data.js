
vs.questions = {
    'abortion': [{text:'Do you generally support pro-choice or pro-life legislation?', yes:'pro-life', no:'pro-choice'}] ,
    'budget': [{text:'In order to balance the budget, do you support an income tax increase on any tax bracket?'}] ,
    'crime': [{text:'Do you support mandatory minimum sentences for non-violent drug offenders?'}] ,
    'economy': [
        {text:'Do you support federal spending as a means of promoting economic growth?'} ,
        {text:'Do you support lowering taxes as a means of promoting economic growth?'}
    ] ,
    'education': [{text:'Do you support requiring states to implement education reforms in order to be eligible for competitive federal grants?'}] ,
    'energy': [
        {text:'Do you support building the Keystone XL pipeline?'} ,
        {text:'Do you support funding for the development of renewable energy (e.g. solar, wind, thermal)?'}
    ] ,
    'environment': [{text:'Do you support the federal regulation of greenhouse gas emissions?'}] ,
    'guns': [{text:'Do you generally support gun-control legislation?'}] ,
    'health care': [{text:'Do you support repealing the 2010 Affordable Care Act ("Obamacare")?'}] ,
    'immigration': [{text:'Do you support requiring illegal immigrants to return to their country of origin before they are eligible for citizenship?'}] ,
    'marriage': [{text:'Do you support same-sex marriage?'}] ,
    'national security': [{text:'Do you support targeting suspected terrorists outside of official theaters of conflict?'}] ,
    'social security': [{text:'Do you support allowing individuals to divert a portion of their Social Security taxes into personal retirement accounts?'}]
};

vs.candidates = {
    'Jeb Bush': {
        'party': 'Republican' ,
        'image': 'images/faceBush.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': ['no'] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': ['yes', 'no'] ,
            'environment': [null] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['no'] ,
            'marriage': ['no'] ,
            'national security': [null] ,
            'social security': ['yes']
        }
    } ,

    'Ben Carson': {
        'party': 'Republican' ,
        'image': 'images/faceCarson.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': [null] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': [null, null] ,
            'environment': ['no'] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['yes'] ,
            'marriage': ['no'] ,
            'national security': ['yes'] ,
            'social security': [null]
        }
    } ,

    'Hillary Clinton': {
        'party': 'Democratic' ,
        'image': 'images/faceClinton.png' ,
        'answers': {
            'abortion': ['pro-choice'] ,
            'budget': ['yes'] ,
            'crime': ['no'] ,
            'economy': ['yes', 'yes'] ,
            'education': ['yes'] ,
            'energy': ['no', 'yes'] ,
            'environment': ['yes'] ,
            'guns': ['yes'] ,
            'health care': ['no'] ,
            'immigration': ['no'] ,
            'marriage': ['yes'] ,
            'national security': ['yes'] ,
            'social security': ['no']
        }
    } ,

    'Ted Cruz': {
        'party': 'Republican' ,
        'image': 'images/faceCruz.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': ['no'] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': ['yes', 'no'] ,
            'environment': ['no'] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['yes'] ,
            'marriage': ['no'] ,
            'national security': ['yes'] ,
            'social security': ['yes']
        }
    } ,

    'Gary Johnson': {
        'party': 'Libertarian' ,
        'image': 'images/faceJohnson.png' ,
        'answers': {
            'abortion': ['pro-choice'] ,
            'budget': ['no'] ,
            'crime': ['no'] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': [null, null] ,
            'environment': [null] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['no'] ,
            'marriage': ['yes'] ,
            'national security': [null] ,
            'social security': [null]
        }
    } ,

    'John Kasich': {
        'party': 'Republican' ,
        'image': 'images/faceKasich.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': ['no'] ,
            'economy': [null, 'yes'] ,
            'education': ['no'] ,
            'energy': ['yes', 'no'] ,
            'environment': ['no'] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['no'] ,
            'marriage': ['no'] ,
            'national security': [null] ,
            'social security': [null]
        }
    } ,

    'Marco Rubio': {
        'party': 'Republican' ,
        'image': 'images/faceRubio.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': [null] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': ['yes', 'yes'] ,
            'environment': ['no'] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['yes'] ,
            'marriage': ['no'] ,
            'national security': ['yes'] ,
            'social security': ['yes']
        }
    } ,

    'Bernie Sanders': {
        'party': 'Democratic' ,
        'image': 'images/faceSanders.png' ,
        'answers': {
            'abortion': ['pro-choice'] ,
            'budget': ['yes'] ,
            'crime': ['no'] ,
            'economy': ['yes', 'yes'] ,
            'education': ['no'] ,
            'energy': ['no', 'yes'] ,
            'environment': ['yes'] ,
            'guns': ['yes'] ,
            'health care': ['no'] ,
            'immigration': ['no'] ,
            'marriage': ['yes'] ,
            'national security': ['no'] ,
            'social security': ['no']
        }
    } ,

    'Jill Stein': {
        'party': 'Green' ,
        'image': 'images/faceStein.png' ,
        'answers': {
            'abortion': ['pro-choice'] ,
            'budget': ['yes'] ,
            'crime': ['no'] ,
            'economy': ['yes', 'yes'] ,
            'education': ['no'] ,
            'energy': ['no', 'yes'] ,
            'environment': ['yes'] ,
            'guns': ['yes'] ,
            'health care': ['yes'] ,
            'immigration': ['no'] ,
            'marriage': ['yes'] ,
            'national security': ['no'] ,
            'social security': ['no']
        }
    } ,

    'Donald Trump': {
        'party': 'Republican' ,
        'image': 'images/faceTrump.png' ,
        'answers': {
            'abortion': ['pro-life'] ,
            'budget': ['no'] ,
            'crime': [null] ,
            'economy': ['no', 'yes'] ,
            'education': ['no'] ,
            'energy': ['yes', 'no'] ,
            'environment': ['no'] ,
            'guns': ['no'] ,
            'health care': ['yes'] ,
            'immigration': ['yes'] ,
            'marriage': ['no'] ,
            'national security': [null] ,
            'social security': ['no']
        }
    }
};



