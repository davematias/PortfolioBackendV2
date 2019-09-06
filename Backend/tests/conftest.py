import pytest

@pytest.fixture(autouse=True)
def env_setup(monkeypatch):    
    monkeypatch.setenv('IS_OFFLINE', 'True')
    monkeypatch.setenv('PROFILE_TABLE', 'PROFILE-TEST')