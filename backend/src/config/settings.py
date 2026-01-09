import os
import logging
from typing import List, Optional
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict

logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    app_name: str = "Free Profile Evaluation API"
    app_version: str = "2.0.0"
    environment: str = "development"
    debug: bool = False
    host: str = "0.0.0.0"
    port: int = 8000
    openai_api_key: str
    openai_model: str = "gpt-4o"
    openai_timeout: int = 60
    openai_max_retries: int = 3
    openai_retry_delay: float = 1.5
    database_url: str
    db_pool_size: int = 10
    db_max_overflow: int = 20
    db_pool_timeout: int = 30
    cache_enabled: bool = True
    cache_ttl: Optional[int] = None 
    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    def get_cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]
    log_level: str = "INFO"
    log_format: str = "json"
    aws_region: Optional[str] = None
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None
    enable_metrics: bool = True
    sentry_dsn: Optional[str] = None
    admin_username: str
    admin_password: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

    def model_post_init(self, __context) -> None:
        """Validate required settings after initialization."""
        # Check if admin credentials are set
        if not self.admin_username or not self.admin_password:
            error_msg = (
                "CRITICAL: ADMIN_USERNAME and ADMIN_PASSWORD environment variables are required! "
                "Please set them in your Elastic Beanstalk environment configuration or .env file. "
                "Admin authentication will not work without these credentials."
            )
            logger.error(error_msg)
            raise ValueError(error_msg)
        
        # Log admin username (safe to log) and password length (for debugging)
        logger.info(
            f"Admin credentials loaded: username='{self.admin_username}', "
            f"password_length={len(self.admin_password)}"
        )
        
        # Log a warning if using weak credentials (but don't fail)
        if len(self.admin_password) < 12:
            logger.warning(
                f"Admin password is less than 12 characters. "
                f"Consider using a stronger password for production environments."
            )

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"

    @property
    def is_development(self) -> bool:
        return self.environment.lower() == "development"


@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
